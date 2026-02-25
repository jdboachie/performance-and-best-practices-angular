import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true,
  pure: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): string {
    if (!value) return '';
    return this.sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
  }
}
