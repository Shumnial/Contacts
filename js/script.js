'use strict';
var contactsForm = document.querySelector('.contacts-form');
var lastnameField = document.querySelector('.contacts-form__lastname');
var firstnameField = document.querySelector('.contacts-form__firstname');
var telField = document.querySelector('.contacts-form__tel');
var contactsList = document.querySelector('.contacts').querySelector('.contacts-list');

// Добавляет в DOM клонированную ноду контакта из шаблона, заполняя ее данными формы
var addContact = function () {
  var template = document.querySelector('#contacts-template');
  var contact = template.content.cloneNode(true);
  var contactInitials = contact.querySelector('.contacts-item__initials');
  var contactFirstname = contact.querySelector('.contacts-item__firstname');
  var contactLastname = contact.querySelector('.contacts-item__lastname');
  var contactTel = contact.querySelector('.contacts-item__tel');
  contactInitials.textContent = firstnameField.value.charAt(0) + lastnameField.value.charAt(0);
  contactFirstname.textContent = firstnameField.value;
  contactLastname.textContent = lastnameField.value;
  contactTel.textContent = telField.value;
  contactTel.setAttribute('href', 'tel:' + telField.value);
  contactsList.appendChild(contact);
};

// Превращает коллекцию в массив и сортирует контакты по фамилиям
var sortedContacts = [];
var sortContacts = function () {
  sortedContacts = [].slice.call(contactsList.children).sort(function (a, b) {
    if (a.children[2].textContent < b.children[2].textContent) {
      return -1;
    }
    if (a.children[2].textContent > b.children[2].textContent) {
      return 1;
    }
    return 0;
  });
};

// Удаляет контакты, чтобы после сортировки в ДОМ-дерево были добавлены новые отсортированные контакты
var deleteContacts = function () {
  sortedContacts.forEach(function (item) {
    item.remove();
  });
};

// Отрисовывает отсортированный массив контактов
var renderSortedContacts = function () {
  var fragment = document.createDocumentFragment();
  sortedContacts.forEach(function (item) {
    fragment.appendChild(item);
  });
  contactsList.appendChild(fragment);
};

var onFormSubmit = function (evt) {
  evt.preventDefault();
  addContact();
  contactsForm.reset();
  sortContacts();
  deleteContacts();
  renderSortedContacts();
};

var onDeleteButtonClick = function (evt) {
  if (evt.target.classList.contains('contacts-item__delete')) {
    evt.target.parentNode.remove();
  }
};

contactsList.addEventListener('click', onDeleteButtonClick);
contactsForm.addEventListener('submit', onFormSubmit);
