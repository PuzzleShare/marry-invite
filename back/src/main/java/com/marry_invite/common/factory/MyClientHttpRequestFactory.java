package com.marry_invite.common.factory;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import java.io.IOException;
import java.net.HttpURLConnection;

@Configuration
public class MyClientHttpRequestFactory extends SimpleClientHttpRequestFactory {
    @Override
    protected void prepareConnection(
            HttpURLConnection connection,
            String httpMethod
    ) throws IOException {
        super.prepareConnection(connection, httpMethod);
        if ("DELETE".equals(httpMethod)) {
            connection.setDoOutput(true);
        }
    }
}