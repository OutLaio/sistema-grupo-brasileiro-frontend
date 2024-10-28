import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-file',
  templateUrl: './loading-file.component.html',
  styleUrls: ['./loading-file.component.css']
})
export class LoadingFileComponent {
  progress: number = 0;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  files: any[] = [];

  @Output() filesLoaded: EventEmitter<{ name: string, url: string }[]> = new EventEmitter();

  getImageUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }

  onFileDropped($event: any) {
    const fileList = $event as File[];
    this.prepareFilesList(fileList);
  }

  onFileUpload(files: FileList): void {
    const uploadedFiles: { name: string, url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      uploadedFiles.push({ name: file.name, url });
    }

    this.filesLoaded.emit(uploadedFiles);
  }

  fileBrowseHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.prepareFilesList(Array.from(inputElement.files));
    }
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
    this.filesLoaded.emit(this.files.map(file => ({ name: file.name, url: URL.createObjectURL(file) })));
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 10;
          }
        }, 200);
      }
    }, 500);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
        item.progress = 0;
        item.url = this.getImageUrl(item);
        this.files.push(item);
    }
    if (this.fileDropEl) {
        this.fileDropEl.nativeElement.value = "";
    }
    this.uploadFilesSimulator(0);
    this.filesLoaded.emit(this.files.map(file => ({ name: file.name, url: file.url })));
}


  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  ngOnDestroy() {
    this.files.forEach(file => {
        if (file.url) {
            window.URL.revokeObjectURL(file.url);
        }
    });
}
}
