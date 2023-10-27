package com.PasswordManger.hicham.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User
{
	private Long id ;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
}
