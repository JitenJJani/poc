import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatContactNo'
})
export class ContactNumberPipe implements PipeTransform {
    transform(n: string) {
        return "+91 " + n
    }
}