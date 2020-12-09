create or replace function GetProcessCode(payload varchar(2000)) returns varchar(100)
as $$
begin
return pc."Name" AS Name from "ProcessCodes" pc 
where pc.guid = (payload::json#>>'{metadata,processID}')::uuid;
end;
$$ LANGUAGE plpgsql;