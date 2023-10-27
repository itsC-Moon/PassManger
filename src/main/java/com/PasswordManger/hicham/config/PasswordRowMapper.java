package com.PasswordManger.hicham.config;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.PasswordManger.hicham.model.Password;

public class PasswordRowMapper implements RowMapper<Password>
{

	@Override
	public Password mapRow(ResultSet rs, int rowNum) throws SQLException
	{
		return Password.builder()
						.id(rs.getLong("id"))
						.email(rs.getString("email"))
						.name(rs.getString("name"))
						.password(rs.getString("password"))
						.username(rs.getString("username"))
						.favourite(rs.getBoolean("favourite"))
						.tag(rs.getString("tagname"))
						.tagId(rs.getLong("tagid"))
						.userId(rs.getLong("userid"))
						.build();
	}
}
