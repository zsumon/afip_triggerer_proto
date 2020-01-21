create or replace NONEDITIONABLE PROCEDURE publish_test_result (
    invoice_id      IN  VARCHAR2,
    report_id       IN  VARCHAR2,
    test_type       IN  VARCHAR2,
    test_result     IN  VARCHAR2,
    patient_name    IN  VARCHAR2,
    patient_age     IN  VARCHAR2,
    patient_gender  IN  VARCHAR2,
    patient_phone   IN  VARCHAR2,
    patient_email   IN  VARCHAR2
) IS

    req      utl_http.req;
    res      utl_http.resp;
    url      VARCHAR2(4000) := 'http://192.168.0.174:7700/reports_updated';
    name     VARCHAR2(4000);
    buffer   VARCHAR2(4000);
    reqbody  VARCHAR2(4000) := '{"invoice_id":"'
                              || invoice_id
                              || '", "report_id":"'
                              || report_id
                              || '", "test_type":"'
                              || test_type
                              || '", "test_result":"'
                              || test_result
                              || '", "patient_name":"'
                              || patient_name
                              || '", "patient_age":"'
                              || patient_age
                              || '", "patient_gender":"'
                              || patient_gender
                              || '", "patient_phone":"'
                              || patient_phone
                              || '", "patient_email":"'
                              || patient_email
                              || '"}';
BEGIN
    req := utl_http.begin_request(url, 'POST', ' HTTP/1.1');
    utl_http.set_header(req, 'user-agent', 'mozilla/4.0');
    utl_http.set_header(req, 'content-type', 'application/json');
    utl_http.set_header(req, 'Content-Length', length(reqbody));
    utl_http.write_text(req, reqbody);
    res := utl_http.get_response(req);
  -- process the response from the HTTP call
    BEGIN
        LOOP
            utl_http.read_line(res, buffer);
            dbms_output.put_line(buffer);
        END LOOP;

        utl_http.end_response(res);
    EXCEPTION
        WHEN utl_http.end_of_body THEN
            utl_http.end_response(res);
    END;

END publish_test_result;