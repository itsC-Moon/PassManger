package com.PasswordManger.hicham.service;



import org.springframework.http.ResponseEntity;

import com.PasswordManger.hicham.model.Password;

public interface PasswordService
{
	public ResponseEntity<Object> AddNewPassword(Password password);
	public ResponseEntity<Object> DeletePassword(Long id,Long userId);
	public ResponseEntity<Object> getAll(Long id);
	public ResponseEntity<Object> getTag(Long id);
	public ResponseEntity<Object> update(Password password);

}
