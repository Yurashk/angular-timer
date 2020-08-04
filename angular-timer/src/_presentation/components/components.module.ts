import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TimerComponent } from "./timer";

@NgModule({
  declarations: [TimerComponent],
  imports: [BrowserModule],
  exports: [TimerComponent],
})
export class ComponentsModule {}
