import { Component, HostListener, OnInit } from '@angular/core';
import { version } from '../../../package.json';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	hrMargins = false;
	currentYear = new Date().getFullYear();
	version = version;

	constructor() {
		this.toggleHrMargins();
	}

	ngOnInit() {
	}

	toggleHrMargins() {
		if (window.innerWidth < 660) {
			this.hrMargins = true;
		} else {
			this.hrMargins = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		this.toggleHrMargins();
	}
}
