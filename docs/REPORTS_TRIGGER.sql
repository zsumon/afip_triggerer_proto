CREATE OR REPLACE TRIGGER tsh_trigger AFTER
    INSERT OR DELETE OR UPDATE OF invoice_id, report_id, test_result ON afip.tsh
    FOR EACH ROW
    
    --   get patient name & phone by invoice id...
DECLARE
    pname   VARCHAR2(50);
    pphone  VARCHAR2(12);
BEGIN
    SELECT
        patient_name
    INTO pname
    FROM
        afip.patient_info
    WHERE
        invoice_id = :new.invoice_id;

    publish_test_result(:new.invoice_id, 'TSH', :new.test_result, pname, pphone);

END;