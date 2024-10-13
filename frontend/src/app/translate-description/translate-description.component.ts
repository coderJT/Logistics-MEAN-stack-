import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-translate-description',
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css'],
  imports: [FormsModule],
  standalone: true
})

export class TranslateDescriptionComponent implements OnInit {
  packages: any[] = [];
  selectedLanguage: string = 'es';
  translatedDescription: string | null = null;
  private socket: any;
  selectedPackage: string | null = null;

  languages: { code: string, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];

  constructor(private packageService: PackageService) {
    this.socket = io('http://35.187.241.193:8080');
  }

  ngOnInit(): void {
    this.loadPackages();
    this.listenForTranslations();
  }

  loadPackages() {
    this.packageService.getPackages().subscribe((response: any) => {
      this.packages = response;
    });
  }

  translateDescription(packageItem: any) {
    const translationRequest = {
      description: packageItem.package_description,
      targetLanguage: this.selectedLanguage
    };
    this.socket.emit("translateRequest", translationRequest);

    this.socket.on("translationResponse", (data: any) => {
      if (data.error) {
        console.error(data.error);
        packageItem.translatedDescription = null;
      } else {
        console.log(data.translation);
        packageItem.translatedDescription = data.translation;
        this.selectedPackage = packageItem._id;
        console.log(this.selectedPackage)
      }
    });
  }

  listenForTranslations() {
    this.socket.on("translationResponse", (data: any) => {
      if (data.error) {
        console.error(data.error);
        this.translatedDescription = null;
      } else {
        this.translatedDescription = data.translation;
      }
    });
  }
}
