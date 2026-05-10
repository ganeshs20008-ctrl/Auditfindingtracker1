package tool.controller;

import org.springframework.web.bind.annotation.*;
import tool.entity.Risk;
import tool.repository.RiskRepository;
import tool.service.EmailService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private final RiskRepository riskRepository;
    private final EmailService emailService;

    public TestController(RiskRepository riskRepository, EmailService emailService) {
        this.riskRepository = riskRepository;
        this.emailService = emailService;
    }

    @GetMapping("/risks")
    public List<Risk> getRisks() {
        return riskRepository.findAll();
    }

    @PostMapping("/risks")
    public Risk createRisk(@RequestBody Risk risk) {

        Risk savedRisk = riskRepository.save(risk);

        emailService.sendRiskEmail(
                savedRisk.getTitle(),
                savedRisk.getSeverity()
        );

        return savedRisk;
    }

    @DeleteMapping("/risks/{id}")
    public void deleteRisk(@PathVariable Long id) {
        riskRepository.deleteById(id);
    }

    @PutMapping("/risks/{id}")
    public Risk updateRisk(@PathVariable Long id, @RequestBody Risk updatedRisk) {

        Risk risk = riskRepository.findById(id).orElseThrow();

        risk.setTitle(updatedRisk.getTitle());
        risk.setSeverity(updatedRisk.getSeverity());

        return riskRepository.save(risk);
    }
}