import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;

  @IsLongitude()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @IsLatitude()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  lat: number;
}
