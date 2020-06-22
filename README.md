Trove
=====

This is a project of etreedb.org.  Using data gathering and cross referencing techniques developed over years
api.etreedb.org has a complete copy of the Live Music Archive (LMA) data hosted at the [Internet Archive](https://archive.org).
Trove uses this data through the use of public APIs to create a very simple interface for browsing and playing
concerts from the LMA.

Where possible LMA data is cross referenced with [etreedb.org](https://etreedb.org) to provide more complete
source data for each recording.  The etreedb.org source data takes precedent.  Source information is displayed 
with each recording including the description file for a complete record of the source.

Trove is a progressive web app (PWA) written in Angular 9 which can be installed as a phone or browser application.

The goals of Trove are 

* Keep a simple interface without clutter.  
* Speed to find, select, and play a recording is paramount.

Towards these ends there are not links to etreedb.org for detailed records, links to the LMA besides
what is provided in the player, or links to any other sites.


Requirements
------------

npm and associated node applications.


Installation
------------

Clone the repository and edit the `src/environments/environment.ts` file to point to api.etreedb.org.  See
the `src/environments/environment.prod.ts` file for an example.

Install the required packages by running from the root folder

```
npm install
```


Run 
---

```ng serve``` 

then browse to http://localhost:4200


Contributing 
------------

You must adhere to the [Code of Conduct](CODE_OF_CONDUCT.md)
