import { WatchTvService } from './../watch-tv.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'rtv-channel-picker',
  templateUrl: './channel-picker.component.html',
  styleUrls: ['./channel-picker.component.css']
})
export class ChannelPickerComponent implements OnInit {
    input: FormControl = new FormControl();
    options: string[];
    filteredOptions: Observable<string[]>;
    lastValue: string;
    isChanged: boolean;
  
    constructor(private tv: WatchTvService) {
        this.options = tv.suggestedSubredditNameList;
    }

    ngOnInit() {
      this.filteredOptions = this.input.valueChanges.pipe(
        startWith(this.tv.getSubredditName()),
        map(value => this._filter(value))
      );
        
        this.input.setValue(this.tv.getSubredditName());
        this.lastValue = this.input.value.toLowerCase().trim();
    }

    setChannel() {
        this.tv.setSubredditName(this.input.value).subscribe();
        this.isChanged = false;
        this.lastValue = this.input.value.toLowerCase().trim();
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase().trim();
      this.isChanged = (this.lastValue !== filterValue);
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
