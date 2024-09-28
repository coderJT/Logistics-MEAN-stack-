import { Component, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent implements OnDestroy {
  audioUrl: string | null = null; 
  private socket: Socket;
  drivers: any[] = [];
  selectedDriver: string | null = null;

  constructor(private driversDB: DriverService) {
    // Initialize the socket connection
    this.socket = io('http://localhost:8080'); // Replace with your server URL

    // Listen for speech results from the server
    this.socket.on('speechResult', (data: { audioContent: string }) => {
      if (data.audioContent) {
        const audioBlob = this.base64ToBlob(data.audioContent, 'audio/mp3');
        this.audioUrl = URL.createObjectURL(audioBlob);
      }
    });
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.drivers = [];
    this.driversDB.getDrivers().subscribe(
      (response: any) => {
        for (let driver of response) {
          this.drivers.push(driver);
        }
      },
      error => {
        console.error("Failed to load drivers:", error)
      }
    )
  }

  convert(driver: any) {
    const request = {
      text: driver.driver_id,
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' }
    };

    this.selectedDriver = driver._id;
    this.socket.emit('textToSpeech', request);
  }

  private base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
