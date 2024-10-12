import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DriverService } from '../driver.service';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})

/**
 * This component is responsible for adding the text to speech component.
 * 
 * This component provides helps to list out the drivers and provides an option
 * to convert each driver's license to speech format.
 */
export class TextToSpeechComponent {
  audioUrl: string | null = null; 
  private socket: Socket;
  drivers: Driver[] = [];
  selectedDriver: string | null = null;

  /**
   * Constructor that injects the DriverService for handling driver-related operations.
   * It also helps to establish a socket.io connection to the server.
   * @param driversDB - Driver service.
   */
  constructor(private driversDB: DriverService) {

    this.socket = io('http://34.46.148.187'); 

    this.socket.on('speechResult', (data: { audioContent: string }) => {
      if (data.audioContent) {
        const audioBlob = this.base64ToBlob(data.audioContent, 'audio/mp3');
        this.audioUrl = URL.createObjectURL(audioBlob);
      }
    });
  }

  /**
   * Load drivers on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
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
  /**
   * This method helps to send a request to the server for conversion purposes.
   * 
   * @param driver - Drivers to have its license converted to speech.
   * 
   * @returns {void}
   */
  convert(driver: any): void {
    const request = {
      text: driver.driver_license,
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' }
    };

    this.selectedDriver = driver._id;
    this.socket.emit('textToSpeech', request);
  }

  /**
   * Method to convert base64 to blob.
   * 
   * @param base64 - Base64 representation of the audio file.
   * @param mimeType - Mime type of the audio file.
   * 
   * @returns Blob representation of the audio file.
   */
  private base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  /**
   * Closes the socket connection on destory of this component.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
