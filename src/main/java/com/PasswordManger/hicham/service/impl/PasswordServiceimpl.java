package com.PasswordManger.hicham.service.impl;


import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.PasswordManger.hicham.database.PasswordRepository;
import com.PasswordManger.hicham.model.ErrorJson;
import com.PasswordManger.hicham.model.Password;
import com.PasswordManger.hicham.service.PasswordService;


@Service
public class PasswordServiceimpl implements PasswordService
{
	private final PasswordRepository passwordRepository;


	public PasswordServiceimpl(PasswordRepository passwordRepository)
	{
		this.passwordRepository = passwordRepository;
	}

	@Override
	public ResponseEntity<Object> AddNewPassword(Password password)
	{
		if (passwordRepository.UserExists(password.getUserId()) == false)
			return new ResponseEntity<>(new ErrorJson(false, "bad request"), HttpStatus.BAD_REQUEST);
		else if (password.getName() == null)
			return new ResponseEntity<>(new ErrorJson(false, "Name can not be null"), HttpStatus.BAD_REQUEST);
		else if (password.getPassword() == null)
			return new ResponseEntity<>(new ErrorJson(false, "Password can not be null"), HttpStatus.BAD_REQUEST);
		try
		{
			passwordRepository.AddNewPassword(password);
			return ResponseEntity.ok(new ErrorJson(true, "Password has been add !"));
		} catch (DataAccessException e)
		{
			return new ResponseEntity<>(new ErrorJson(false, "Some thing go worng Contact support" + e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<Object> DeletePassword(Long id, Long userId)
	{
		if (!passwordRepository.PasswordExists(id))
			return ResponseEntity.ok(new ErrorJson(false, "Password does not exists !"));
		try
		{
			Integer rowcount = passwordRepository.DeletePassword(id, userId);
			if (rowcount == 1)
				return ResponseEntity.ok(new ErrorJson(true, "Password has been Delete !"));
			else if (rowcount == 0)
				return new ResponseEntity<>(new ErrorJson(false, "Access denied"), HttpStatus.FORBIDDEN);
			else
			{
				System.out.println("database mechete a henini");
				return new ResponseEntity<>(new ErrorJson(false, "This incident will be reported"), HttpStatus.BAD_REQUEST);
			}

		} catch (DataAccessException e)
		{
			return new ResponseEntity<>(new ErrorJson(false, "Some thing go worng Contact support"), HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<Object> getAll(Long id)
	{
		if (passwordRepository.UserExists(id) == false)
			return new ResponseEntity<>(new ErrorJson(false, "Bad request"), HttpStatus.BAD_REQUEST);
		return new ResponseEntity<Object>(passwordRepository.getAll(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Object> getTag(Long id)
	{
		if (passwordRepository.UserExists(id) == false)
			return new ResponseEntity<>(new ErrorJson(false, "Bad request"), HttpStatus.BAD_REQUEST);
		return new ResponseEntity<Object>(passwordRepository.getTag(id), HttpStatus.OK);


	}

	@Override
	public ResponseEntity<Object> update(Password password)
	{
		try
		{
			Integer rowcount = passwordRepository.update(password);
			if (rowcount == 1)
				return ResponseEntity.ok(new ErrorJson(true, "Password has been update !"));
			else if (rowcount == 0)
				return new ResponseEntity<>(new ErrorJson(false, "Access denied"), HttpStatus.FORBIDDEN);
			else
			{
				System.out.println("database mechete a henini");
				return new ResponseEntity<>(new ErrorJson(false, "This incident will be reported"), HttpStatus.BAD_REQUEST);
			}

		} catch (DataAccessException e)
		{
			return new ResponseEntity<>(new ErrorJson(false, "Some thing go worng Contact support"+e.getMessage()), HttpStatus.BAD_REQUEST);
		}

	}


}
