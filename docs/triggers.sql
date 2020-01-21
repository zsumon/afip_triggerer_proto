CREATE OR REPLACE NONEDITIONABLE TRIGGER bilirubin_trigger AFTER
    DELETE OR INSERT OR UPDATE OF invoice_id, report_id, test_result ON afip.bilirubin
    FOR EACH ROW
    --   get patient name & phone by invoice id...
    --   get patient name & phone by invoice id...
DECLARE
    patname    VARCHAR2(100);
    patage     VARCHAR2(100);
    patgender  VARCHAR2(100);
    patphone   VARCHAR2(100);
    patemail   VARCHAR2(100);
BEGIN
    SELECT
        patient_name,
        patient_age,
        patient_gender,
        patient_phone,
        patient_email
    INTO
        patname,
        patage,
        patgender,
        patphone,
        patemail
    FROM
        afip.patient_info
    WHERE
        invoice_id = :new.invoice_id;

    publish_test_result(:new.invoice_id, :new.report_id, 'BILIRUBIN', :new.test_result, patname,
                        patage, patgender, patphone, patemail);

END;


-- tsh trigger
create or replace NONEDITIONABLE TRIGGER tsh_trigger AFTER
    INSERT OR DELETE OR UPDATE OF invoice_id, report_id, test_result ON afip.tsh
    FOR EACH ROW
    --   get patient name & phone by invoice id...
DECLARE
    patname    VARCHAR2(100);
    patage     VARCHAR2(100);
    patgender  VARCHAR2(100);
    patphone   VARCHAR2(100);
    patemail   VARCHAR2(100);
BEGIN
    SELECT
        patient_name,
        patient_age,
        patient_gender,
        patient_phone,
        patient_email
    INTO
        patname,
        patage,
        patgender,
        patphone,
        patemail
    FROM
        afip.patient_info
    WHERE
        invoice_id = :new.invoice_id;

    publish_test_result(:new.invoice_id, :new.report_id, 'TSH', :new.test_result, patname,
                        patage, patgender, patphone, patemail);

END;