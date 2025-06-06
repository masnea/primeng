import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'toggle-switch-accessibility-doc',
    standalone: false,
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                InputSwitch component uses a hidden native checkbox element with <i>switch</i> role internally that is only visible to screen readers. Value to describe the component can either be provided via <i>label</i> tag combined with
                <i>inputId</i> prop or using <i>ariaLabelledBy</i>, <i>ariaLabel</i> props.
            </p>
        </app-docsectiontext>

        <app-code [code]="code" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>

        <h3>Keyboard Support</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <i>tab</i>
                        </td>
                        <td>Moves focus to the switch.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the checked state.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<label for="switch1">Remember Me</label>
<p-toggleswitch inputId="switch1" />

<span id="switch2">Remember Me</span>
<p-toggleswitch ariaLabelledBy="switch2" />

<p-toggleswitch ariaLabel="Remember Me" />`
    };
}
