import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as RecordRtc from 'recordrtc';

@Component({
  moduleId: module.id,
  selector: 'app-camera',
  templateUrl: './camera.html'
})

export class CameraComponent implements AfterViewInit {
  @ViewChild('video') video: any;
  canDownload: boolean = false;
  stream: any;
  recordRTC: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  startRecording() {
    const mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this),
        this.errorCallback.bind(this));
  }

  successCallback(stream: MediaStream): void {
    const options = {
      mimeType: 'video/webm',
      bitsPerSecond: 128000
    };
    this.stream = stream;
    this.recordRTC = RecordRtc(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  toggleControls(): void  {
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  stopRecording(): void {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  processVideo(): void {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    console.log(video.src);
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(dataURL => {});
  }

  download(): void {
    this.recordRTC.save('video.webm');
  }

  errorCallback(error: any) {
    console.log('error', error);
  }
}
