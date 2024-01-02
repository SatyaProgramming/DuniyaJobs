package com.job_finder.utility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggingConfig {

    @Bean
    public Logger logger() {
        return LoggerFactory.getLogger("CompanyLogger"); // You can replace "YourLoggerName" with any appropriate name
    }
}
