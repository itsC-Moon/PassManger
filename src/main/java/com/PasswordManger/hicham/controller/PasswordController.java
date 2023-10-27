package com.PasswordManger.hicham.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.PasswordManger.hicham.model.Password;
import com.PasswordManger.hicham.service.PasswordService;


@RestController
public class PasswordController
{
	private final PasswordService passwordService;

	public PasswordController(PasswordService passwordService)
	{
		this.passwordService = passwordService;
	}

	@GetMapping("/api/{id}")
	public ResponseEntity<Object> getll(@PathVariable(name  = "id") Long id)
	{
		return passwordService.getAll(id);
	}
	@PostMapping("/api/add")
	public ResponseEntity<Object> AddPass(@RequestBody Password pass)
	{
		return passwordService.AddNewPassword(pass);
	}
	@GetMapping("/api/delete/{id}")
	public ResponseEntity<Object> DeletePass(@PathVariable(name  = "id") Long id)
	{
		return passwordService.DeletePassword(id, 1L);
	}

	@GetMapping("/api/tag/{id}")
	public ResponseEntity<Object> getTag(@PathVariable Long id)
	{
		return passwordService.getTag(id);
	}
	@PostMapping("/api/update")
	public ResponseEntity<Object> update(@RequestBody Password password)
	{
		System.out.println(password.toString());;
		return passwordService.update(password);
	}
	@GetMapping("/test")
	public String addFoo()
	{
		System.out.println("Hello");
		return "ist work";
	}

}
