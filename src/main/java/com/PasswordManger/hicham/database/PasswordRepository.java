package com.PasswordManger.hicham.database;

import java.util.List;

import com.PasswordManger.hicham.model.Password;
import com.PasswordManger.hicham.model.Tag;

public interface PasswordRepository
{
	public Integer AddNewPassword(Password password);
	public Integer DeletePassword(Long id,Long userID);
	public Boolean PasswordExists(Long id);
	public Boolean UserExists(Long id);
	public List<Password> getAll(Long id);
	public List<Tag> getTag(Long id);

	public Integer update(Password password);



}
