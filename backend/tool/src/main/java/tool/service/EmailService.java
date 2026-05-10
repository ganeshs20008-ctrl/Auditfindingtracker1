package tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRiskEmail(String title, String severity) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo("venkateshsindagi01@gmail.com");

        message.setSubject("New Risk Added");

        message.setText(
                "Risk Title: " + title +
                "\nSeverity: " + severity
        );

        mailSender.send(message);
    }
}