package com.PasswordManger.hicham.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class Password
{
	private Long id;
	private String name;
	private String username;
	private String email;
	private String password;
	private String tag;
	private Long tagId;
	private Boolean favourite;
	private Long userId;
}
