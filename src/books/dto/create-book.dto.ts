export class CreateBookDto {
  title: string;
  description: string;
  price: string;
  tableOfContents?: string[];
  link?:string;
}
