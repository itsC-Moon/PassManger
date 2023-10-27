package com.PasswordManger.hicham.database.impl;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.PasswordManger.hicham.config.PasswordRowMapper;
import com.PasswordManger.hicham.database.PasswordRepository;
import com.PasswordManger.hicham.model.Password;
import com.PasswordManger.hicham.model.Tag;

@Repository
public class Repositoryimpl implements PasswordRepository
{
	JdbcTemplate jdbcTemplate;

	public Repositoryimpl(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public Integer AddNewPassword(Password pass) // TODO : edit insert value
	{
		String sql = "INSERT INTO password(name,email,username,password,favourite,tagid,userid) VALUES(?,?,?,?,?,?,?)";
		return jdbcTemplate.update(sql, pass.getName(), pass.getEmail(), pass.getUsername(), pass.getPassword(), pass.getFavourite(),pass.getTagId(), pass.getUserId());
	}

	@Override
	public Integer DeletePassword(Long id, Long userID)
	{
		String sql = "DELETE FROM password WHERE id=? AND userid=? ";
		return jdbcTemplate.update(sql, id, userID);
	}

	@Override
	public Boolean PasswordExists(Long id)
	{
		String sql = "SELECT * FROM password WHERE id=?";
		List<Object> list = jdbcTemplate.query(sql, (rs, i) -> i, id);
		return (list.size() != 0);
	}

	@Override
	public List<Password> getAll(Long id)
	{
		String sql = "select * from password  left join tag  on tag.id = password.tagid  where password.userid=?";
		List<Password> list = jdbcTemplate.query(sql, new PasswordRowMapper(), id);
		return list;
	}

	@Override
	public Boolean UserExists(Long id)
	{
		String sql = "SELECT * FROM user WHERE id=?";
		List<Object> list = jdbcTemplate.query(sql, (rs, i) -> i, id);
		return (list.size() != 0);
	}

	@Override
	public List<Tag> getTag(Long id)
	{
		String sql = "SELECT * FROM tag WHERE userid=?";
		return jdbcTemplate.query(sql, (rs,i) -> Tag.builder()
		.id(rs.getLong("id"))
		.count(rs.getInt("count"))
		.tagname(rs.getString("tagname"))
		.userid(rs.getLong("userid"))
		.build(), id);
	}


	@Override
	public Integer update(Password pass)
	{
		String sql = "update password set name=?, email=?, username=?, password=?, favourite=?, tagid=? where id=?";
		return jdbcTemplate.update(sql, pass.getName(), pass.getEmail(), pass.getUsername(), pass.getPassword(), pass.getFavourite(), pass.getTagId(), pass.getId());
	}

}