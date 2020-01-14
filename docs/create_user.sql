alter session set "_ORACLE_SCRIPT"=true; 
grant connect to userName identified by password;

-- GRANT CREATE SESSION GRANT ANY PRIVILEGE TO dume;
GRANT UNLIMITED TABLESPACE TO dume;

GRANT
  SELECT,
  INSERT,
  UPDATE,
  DELETE
ON
--   schema.reports
   reports
TO
  dume;
