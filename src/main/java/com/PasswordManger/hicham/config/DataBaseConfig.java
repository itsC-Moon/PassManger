package com.PasswordManger.hicham.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DataBaseConfig
{
	@Bean
	@ConfigurationProperties(prefix = "app.datasource.main")
	public HikariDataSource hikariDataSource()
	{
		return DataSourceBuilder
		.create()
		.type(HikariDataSource.class)
		.build();
	}
	@Bean
	public JdbcTemplate jdbcTemplate(HikariDataSource hikariDataSource)
	{
		return new  JdbcTemplate(hikariDataSource);
	}
}
