package org.example.sawebapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class AnalysisClient {

    private final RestTemplate rest;
    private final String flaskBaseUrl;

    public AnalysisClient(RestTemplate rest,
                          @Value("${analysis.flask-base-url}") String flaskBaseUrl) {
        this.rest = rest;
        this.flaskBaseUrl = flaskBaseUrl;
    }

    public Map<String, Object> analyseSentence(String sentence) {
        String url = flaskBaseUrl + "/analyse/sentiment";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> body = Map.of("sentence", sentence);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = rest.postForEntity(url, request, Map.class);
        return response.getBody();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> uploadReviews(MultipartFile file) {
        String url = flaskBaseUrl + "/upload_reviews";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        ByteArrayResource resource = new ByteArrayResource(asBytes(file)) {
            @Override public String getFilename() { return file.getOriginalFilename(); }
        };

        MultiValueMap<String, Object> mpBody = new LinkedMultiValueMap<>();
        mpBody.add("file", resource);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(mpBody, headers);
        ResponseEntity<Map> response = rest.postForEntity(url, request, Map.class);
        return response.getBody();
    }

    public ResponseEntity<byte[]> downloadReport() {
        String url = flaskBaseUrl + "/download_report";
        return rest.getForEntity(url, byte[].class);
    }

    private byte[] asBytes(MultipartFile f) {
        try { return f.getBytes(); }
        catch (Exception e) { throw new RuntimeException(e); }
    }
}
