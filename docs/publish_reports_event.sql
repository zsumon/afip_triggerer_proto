CREATE OR REPLACE NONEDITIONABLE PROCEDURE publish_reports_event (
    voucher_id    IN  VARCHAR2,
    patient_name  IN  NUMBER
) IS

    req      utl_http.req;
    res      utl_http.resp;
    url      VARCHAR2(4000) := 'http://localhost:7700/reports_updated';
    name     VARCHAR2(4000);
    buffer   VARCHAR2(4000);
    reqbody  VARCHAR2(4000) := '{"voucher_id":"'
                              || voucher_id
                              || '", "patient_name":"'
                              || patient_name
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

END publish_reports_event;