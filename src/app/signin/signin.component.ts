import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {API_CONFIG} from '../const/api.config';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    closeResult = '';

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.authService.logout();
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    login(content): void {
        const userName = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.authService.authenticate(userName, password).subscribe(() => {
                this.open(content);
            }, err => {
                console.log(err);
                alert('Erro ao tentar loggar');
            }
        );
    }

    signup(): void {
        this.router.navigate(['signup']);
    }

    open(content): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
