import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ContactFormI } from '@pages/contact/constact.interface';
import { ContactService } from '@pages/contact/contact.service';
import { EstaSeguroComponent } from '@shared/components/esta-seguro/esta-seguro.component';
import { RespDialogI } from '@shared/models/global.interface';
import { AngularModule, MaterialModule } from '@shared/modules';
import { GlobalService } from '@shared/services/global.service';
import { LanguageService } from '@shared/services/language.service';
import { InputEmailComponent } from '@shared/components/input-email/input-email.component';
import { InputPhoneComponent } from '@shared/components/input-phone/input-phone.component';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { InputTextareaComponent } from '@shared/components/input-textarea/input-textarea.component';

@Component({
  selector: 'app-register-event',
  imports: [
    AngularModule,
    MaterialModule,
    InputTextComponent,
    InputEmailComponent,
    InputPhoneComponent,
    InputTextareaComponent,
  ],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterEventComponent {
  public labelsNames = signal<any>({});

  contactForm!: FormGroup;

  mostrarPassword: boolean = false;
  loaderBtn: boolean = false;

  protected readonly unsubscribeAll: Subject<any> = new Subject<any>();

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _toastr = inject(ToastrService);
  private readonly _languageSvc = inject(LanguageService);
  private readonly _contactSvc = inject(ContactService);
  private readonly _globalSvc = inject(GlobalService);
  private readonly _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.listenerLanguage();
    this.initLoginForm();
  }
  private listenerLanguage(): void {
    this._languageSvc.language$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((langue: string) => {
        if (langue === 'es') {
          this.labelsNames.set({
            title: 'Formulario de registro',
            first_name: 'Nombre',
            last_name: 'Apellido',
            phone: 'Teléfono',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar',
            numberSocio: 'Número de socio',
          });
        } else {
          this.labelsNames.set({
            title: 'Register form',
            first_name: 'First Name',
            last_name: 'Last Name',
            phone: 'Phone',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            numberSocio: 'Number of member',
          });
        }
      });
  }

  private initLoginForm(): void {
    this.contactForm = this._fb.group({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      numberEntradas: new FormControl('', [Validators.required]),

      isSocio: new FormControl(false, [Validators.required]),
      numberSocio: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
    });
  }

  public getControl(fieldName: string): FormControl {
    return this.contactForm.get(fieldName) as FormControl;
  }

  private checkTerms(): void {
    this.contactForm
      .get('policies')
      ?.valueChanges.subscribe((checked: boolean) => {
        if (!checked) {
          this.contactForm.get('policies')?.setErrors({ required: true });
        } else {
          this.contactForm.get('policies')?.setErrors(null);
        }
      });
  }

  public validarForm(): void {
    if (this.contactForm.invalid) {
      this.camposRequeridos();
      return;
    }
    this.estaSeguro();
  }

  private estaSeguro() {
    const action = 'create';
    const message = 'Esta seguro de enviar el mensaje?';
    const data = this.contactForm.getRawValue();
    const dialogRef = this._dialog.open(EstaSeguroComponent, {
      width: '600px',
      disableClose: true,
      data: { data, action, message },
    });
    dialogRef.afterClosed().subscribe((dataResp: RespDialogI) => {
      if (!dataResp) return;
      if (dataResp.action === 'create') {
        this.payloadBody(data);
      }
    });
  }

  private payloadBody(resp: ContactFormI): void {
    const trimmedPayload = this._globalSvc.trimStringProperties(resp);
    this.sendMessage(trimmedPayload);
  }

  private sendMessage(body: ContactFormI): void {
    this._toastr.success('Se ha registrado correctamente al evento', 'Éxito');
    this.contactForm.reset();
    setTimeout(() => {
      this._router.navigate(['/events']);
    }, 3000);
    // this._contactSvc
    //   .createContact(body)
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe({
    //     next: (resp: any) => {
    //       if (resp.status === 201) {
    //         this._toastr.success(resp.message, 'Éxito');
    //         this.contactForm.reset();
    //         setTimeout(() => {
    //           this._router.navigate(['/home']);
    //         }, 3000);
    //       } else {
    //         this._toastr.error(resp.message, 'Error');
    //       }
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this._toastr.error(error.error.message, 'Error');
    //       setTimeout(() => {
    //         this._router.navigate(['/home']);
    //       }, 3000);
    //     },
    //   });
  }

  formLoginInvalid(): boolean {
    this.contactForm.markAllAsTouched();
    return this.contactForm.invalid;
  }

  public camposRequeridos(): void {
    this._toastr.warning('Campos requeridos', 'Formulario invalido');
    this.contactForm.markAllAsTouched();
  }

  clearField(item: string): void {
    while (this.contactForm.get(item)?.value) {
      this.contactForm.get(item)?.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
