alter session set "_ORACLE_SCRIPT"=true;

CREATE USER APPDEV IDENTIFIED BY pass;
GRANT CONNECT,RESOURCE TO APPDEV;
GRANT CREATE SESSION, GRANT ANY PRIVILEGE TO APPDEV;
GRANT UNLIMITED TABLESPACE TO APPDEV;
GRANT EXECUTE on schema.procedure TO APPDEV; -- to execute a method
GRANT SELECT,UPDATE,INSERT ON schema.table TO APPDEV;
GRANT CREATE ANY TRIGGER TO APPDEV; -- to create trigger on any tables..
GRANT CREATE TRIGGER TO APPDEV; -- to create trigger on own tables.. (maybe)

-- https://stackoverflow.com/a/22293352


CREATE USER books_admin IDENTIFIED BY MyPassword;
GRANT CONNECT TO books_admin;
GRANT CONNECT, RESOURCE, DBA TO books_admin;
GRANT CREATE SESSION, GRANT ANY PRIVILEGE TO books_admin;
GRANT UNLIMITED TABLESPACE TO books_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON schema.books TO books_admin;



-- GRANT SELECT, UPDATE, INSERT ON afip.tsh TO appdev;

-- GRANT SELECT, UPDATE, INSERT ON afip.bilirubin TO appdev;

-- GRANT SELECT, UPDATE, INSERT ON afip.patient_info TO appdev;
-- Allow Network Call
-- Grant the connect and resolve privileges for host www.us.oracle.com to SCOTT.

BEGIN
  DBMS_NETWORK_ACL_ADMIN.CREATE_ACL(acl         => 'www.xml',
                                    description => 'WWW ACL',
                                    principal   => 'SCOTT',
                                    is_grant    => true,
                                    privilege   => 'connect');
 
  DBMS_NETWORK_ACL_ADMIN.ADD_PRIVILEGE(acl       => 'www.xml',
                                       principal => 'SCOTT',
                                       is_grant  => true,
                                       privilege => 'resolve');
 
  DBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(acl  => 'www.xml',
                                    host => 'www.us.oracle.com');
END;
/
COMMIT;



-- Example 2

-- Grant the resolve privilege for www.us.oracle.com to ADAMS. Since an ACL for www.us.oracle.com exists already, just add the privilege for ADAMS.

BEGIN
  DBMS_NETWORK_ACL_ADMIN.ADD_PRIVILEGE(acl       => 'www.xml',
                                       principal => 'ADAMS',
                                       is_grant  => true,
                                       privilege => 'resolve');
END;
/
COMMIT;



-- Example 3

-- Assign the ACL www.xml to www-proxy.us.oracle.com so that SCOTT and ADAMS can access www-proxy.us.oracle.com also.

BEGIN
  DBMS_NETWORK_ACL_ADMIN.ASSIGN_ACL(acl  => 'www.xml',
                                    host => 'www-proxy.us.oracle.com');
END;
/
COMMIT;


-- Example 4

-- Unassign the ACL from www.us.oracle.com so that no access to www.us.oracle.com is allowed.

BEGIN
  DBMS_NETWORK_ACL_ADMIN.UNASSIGN_ACL(host => 'www.us.oracle.com');
END;
/
COMMIT;
