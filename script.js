(function () {
    'use strict';

    // Nav active
    const container = document.querySelector('.header__menu');
    const button = document.querySelector('.hamburger');

    button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'header__menu--active' ) ) {
			container.className = container.className.replace( ' header__menu--active', '' );
            button.className = button.className.replace( ' hamburger--close', '' );
            
		} else {
            container.className += ' header__menu--active';
            button.className += ' hamburger--close';
		}
	};

    // Header change on scroll
    function resizeHeaderOnScroll() {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        const shrinkOn = 80;
        const header = document.querySelector('.header');

        if ( ! header ) {
            return;
        }

        if (distanceY > shrinkOn) {
            if( -1 !== header.className.indexOf( 'header--transparent' ) ) { 
               header.className = header.className.replace( 'header--transparent', 'header--dark' );
            }
            header.classList.add("header--small");
        } else {
            if( -1 === header.className.indexOf( 'header--transparent' ) ) { 
                header.className = header.className.replace( 'header--dark', 'header--transparent' );
            }
            header.classList.remove("header--small");
        }
    }
    window.addEventListener('scroll', resizeHeaderOnScroll);

    // Form validation
    const testLength = function(field, lng) {
        return field.value.length > lng;
    };

    const testPhone = function(field) {
        const reg = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
        return reg.test(field.value);
    };

    const removeFieldError = function(field) {
        const errorText = field.nextElementSibling;
        if (errorText !== null) {
            if (errorText.classList.contains("contact__error--active")) {
                errorText.remove();
            }
        }
    };

    const createFieldError = function(field, text) {
        removeFieldError(field);
        const span = document.createElement("span");
        span.classList.add("contact__error--active");
        span.innerText = text;
        if (field.nextElementSibling === null) {
            field.parentElement.appendChild(span);
        } else {
            if (!field.nextElementSibling.classList.contains("contact__error--active")) {
                field.parentElement.insertBefore(span, field.nextElementSibling);
            }
        }
    };

    const markFieldAsError = function(field, show) {
        if (show) {
            field.classList.add("contact__input--error");
        } else {
            field.classList.remove("contact__input--error");
            removeFieldError(field);
        }
    };

    // Variables.
    const form = document.querySelector(".contact__form");
    const inputFirstName = form.querySelector("input[name=first-name]");
    const inputLastName = form.querySelector("input[name=last-name]");
    const inputPhone = form.querySelector("input[name=phone]");
    const inputSubject = form.querySelector("input[name=subject]");
    const formSuccess = form.querySelector(".contact__form-success");

    // Events handling - check inputs when typing.
    inputFirstName.addEventListener("input", e => markFieldAsError(e.target, !testLength(e.target, 3)));
    inputLastName.addEventListener("input", e => markFieldAsError(e.target, !testLength(e.target, 3)));
    inputSubject.addEventListener("input", e => markFieldAsError(e.target, !testLength(e.target, 3)));
    inputPhone.addEventListener("input", e => markFieldAsError(e.target, !testPhone(e.target)));

    // Check inputs when submiting.
    form.addEventListener("submit", e => {
        e.preventDefault();

        let formErrors = false;

        for (const el of [inputFirstName, inputLastName, inputSubject, inputPhone]) {
            markFieldAsError(el, false);
            removeFieldError(el);
        }

        if (!testLength(inputFirstName, 3)) {
            markFieldAsError(inputFirstName, true);
            createFieldError(inputFirstName, "Must be at least 3 characters long.");
            formErrors = true;
        }

        if (!testLength(inputLastName, 3)) {
            markFieldAsError(inputLastName, true);
            createFieldError(inputLastName, "Must be at least 3 characters long.");
            formErrors = true;
        }

        if (!testLength(inputSubject, 3)) {
            markFieldAsError(inputSubject, true);
            createFieldError(inputSubject, "Must be at least 3 characters long.");
            formErrors = true;
        }

        if (!testPhone(inputPhone)) {
            markFieldAsError(inputPhone, true);
            createFieldError(inputPhone, "Must be a phone number, eg.+48123456789.");
            formErrors = true;
        }

        if (!formErrors) {
           formSuccess.className += ' contact__form-success--active';
        }
    });
})();
