import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeHtml } from '@angular/platform-browser';

export interface NewsDialogData {
  title: string;
  body: SafeHtml | string;
}

@Component({
  selector: 'app-news-dialog',
  standalone: false,
  template: `
    <div class="news-dialog">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        <div class="news-dialog-body" [innerHTML]="data.body"></div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-stroked-button color="primary" (click)="onClose()">بستن</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .news-dialog {
      max-width: 720px;
      font-family: 'Vazirmatn', 'Roboto', sans-serif;
    }
    h2 {
      margin: 0 0 12px 0;
      color: #3f51b5;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .news-dialog-body {
      color: #4a5568;
      line-height: 1.8;
      font-size: 1rem;
    }
    .news-dialog-body p {
      margin-bottom: 12px;
    }
    .news-dialog-body img {
      max-width: 100%;
      border-radius: 8px;
      margin: 12px 0;
    }
  `],
})
export class NewsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewsDialogData,
    private dialogRef: MatDialogRef<NewsDialogComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
