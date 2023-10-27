package com.PasswordManger.hicham.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ErrorJson
{
	private Boolean Success;
	private String message;
}
