import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];
  public formCountry: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private _countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  onRegionChanged(): void {
    this.formCountry.get('region')!.valueChanges
      .pipe(
        tap(() => this.formCountry.get('country')?.setValue('')),
        tap(()=>this.borders=[]),
        switchMap(region => this.countryService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
        // console.log(countries);
      })
  }

  onCountryChanged(): void {
    this.formCountry.get('country')!.valueChanges
      .pipe(
        tap(() => this.formCountry.get('border')?.setValue('')),
        filter((value:string)=>value.length>0),
        switchMap(alphaCode=>this.countryService.getCountryByAlphaCode(alphaCode)),
        switchMap(country=>this.countryService.getCountriesByCodes(country.borders))
      )
      .subscribe(countries => {
        this.borders=countries;
        // console.log({ borders });
      })
  }

  public get regions(): Region[] {
    return this._countryService.regions;
  }

  public get countryService(): CountryService {
    return this._countryService;
  }

  public set countryService(value: CountryService) {
    this._countryService = value;
  }
}
