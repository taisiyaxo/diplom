package org.example.sawebapp.controller;

import org.example.sawebapp.service.AnalysisClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SentimentController {

    private final AnalysisClient analysisClient;

    public SentimentController(AnalysisClient analysisClient) {
        this.analysisClient = analysisClient;
    }

    @PostMapping("/sentiment")
    public ResponseEntity<Map<String, Object>> analyseSentence(@RequestBody Map<String, String> payload) {
        String sentence = payload.get("sentence");
        return ResponseEntity.ok(analysisClient.analyseSentence(sentence));
    }

    @PostMapping("/reviews")
    public ResponseEntity<Map<String, Object>> uploadReviews(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(analysisClient.uploadReviews(file));
    }

    @GetMapping("/report")
    public ResponseEntity<byte[]> downloadReport() {
        ResponseEntity<byte[]> response = analysisClient.downloadReport();
        return ResponseEntity
                .ok()
                .header("Content-Disposition", "attachment; filename=report.txt")
                .body(response.getBody());
    }
}
