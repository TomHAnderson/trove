import { HalLinks } from './hal-links';
import { Type } from 'class-transformer';
import { PerformanceEmbedded } from './performance-embedded';

// tslint:disable:variable-name
export class Performance {
  private _id: number;
  private _name: string;
  private _performanceDate: string;
  private _title: string;
  private _venue: string;
  private _city: string;
  private _state: string;
  private _set1: string;
  private _set2: string;
  private _set3: string;
  private _description: string;
  private _year: number;

  @Type(() => PerformanceEmbedded)
  public _embedded: PerformanceEmbedded;

  @Type(() => HalLinks)
  public _links: HalLinks;

  public _computed: {
    performanceCorrection: any;
  };

  constructor() {}

    /**
     * Getter id
     */
  public get id(): number {
    return this._id;
  }

    /**
     * Setter id
     */
  public set id(value: number) {
    this._id = value;
  }

    /**
     * Getter name
     */
  public get name(): string {
    if (this._computed && this._computed.performanceCorrection.name) {
      return this._computed.performanceCorrection.name;
    }

    return this._name;
  }

    /**
     * Setter name
     */
  public set name(value: string) {
    this._name = value;
  }

    /**
     * Getter performanceDate
     */
  public get performanceDate(): string {
    if (this._computed && this._computed.performanceCorrection.performanceDate) {
      return this._computed.performanceCorrection.performanceDate;
    }

    return this._performanceDate;
  }

    /**
     * Setter performanceDate
     */
  public set performanceDate(value: string) {
    this._performanceDate = value;
  }

    /**
     * Getter title
     */
  public get title(): string {
    if (this._computed && this._computed.performanceCorrection.title) {
      return this._computed.performanceCorrection.title;
    }

    return this._title;
  }

    /**
     * Setter title
     */
  public set title(value: string) {
    this._title = value;
  }

    /**
     * Getter venue
     */
  public get venue(): string {
    if (this._computed && this._computed.performanceCorrection.venue) {
      return this._computed.performanceCorrection.venue;
    }

    return this._venue;
  }

    /**
     * Setter venue
     */
  public set venue(value: string) {
    this._venue = value;
  }

    /**
     * Getter city
     */
  public get city(): string {
    if (this._computed && this._computed.performanceCorrection.city) {
      return this._computed.performanceCorrection.city;
    }

    return this._city;
  }

    /**
     * Setter city
     */
  public set city(value: string) {
    this._city = value;
  }

    /**
     * Getter state
     */
  public get state(): string {
    if (this._computed && this._computed.performanceCorrection.state) {
      return this._computed.performanceCorrection.state;
    }

    return this._state;
  }

    /**
     * Setter state
     */
  public set state(value: string) {
    this._state = value;
  }

    /**
     * Getter set1
     */
  public get set1(): string {
    if (this._computed && this._computed.performanceCorrection.set1) {
      return this._computed.performanceCorrection.set1;
    }

    return this._set1;
  }

    /**
     * Setter set1
     */
  public set set1(value: string) {
    this._set1 = value;
  }

    /**
     * Getter set2
     */
  public get set2(): string {
    if (this._computed && this._computed.performanceCorrection.set2) {
      return this._computed.performanceCorrection.set2;
    }

    return this._set2;
  }

    /**
     * Setter set2
     */
  public set set2(value: string) {
    this._set2 = value;
  }

    /**
     * Getter set3
     */
  public get set3(): string {
    if (this._computed && this._computed.performanceCorrection.set3) {
      return this._computed.performanceCorrection.set3;
    }

    return this._set3;
  }

    /**
     * Setter set3
     */
  public set set3(value: string) {
    this._set3 = value;
  }

    /**
     * Getter description
     */
  public get description(): string {
    if (this._computed && this._computed.performanceCorrection.description) {
      return this._computed.performanceCorrection.description;
    }

    return this._description;
  }

    /**
     * Setter description
     */
  public set description(value: string) {
    this._description = value;
  }

    /**
     * Getter year
     */
  public get year(): number {
    if (this._computed && this._computed.performanceCorrection.year) {
      return this._computed.performanceCorrection.year;
    }

    return this._year;
  }

    /**
     * Setter year
     */
  public set year(value: number) {
    this._year = value;
  }

  /**
   * Used for FormBuilder
   */
  public getObjectCopy(): any {
    return {
      performanceDate: this.performanceDate,
      title: this.title,
      venue: this.venue,
      city: this.city,
      state: this.state,
      set1: this.set1,
      set2: this.set2,
      set3: this.set3,
      description: this.description
    };
  }
}
