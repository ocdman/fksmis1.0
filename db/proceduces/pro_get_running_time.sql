USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_get_running_time]    Script Date: 07/24/2014 10:30:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[pro_get_running_time]
	@table_name varchar(20),
	@start_time datetime,
	@end_time datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max),@bit bit;
	    
	    IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
		begin
			select * from DataAnalyse;
			return;
		end
	    
	    set @bit=1;
	    set @sql='';
	    
	    set @sql = @sql + N' select 0 as Id,@bit as IsDeleted,@start_time as AddDate, ''fj'' as Category,convert(date,TimeUP,111) as TimeUp,COUNT(ProbeID) as ProbeID from  '+@table_name;
		set @sql = @sql + N' where YouYanND>20 and ZTfj=1 and ProbeID=1 and TimeUP between @start_time and @end_time';
		set @sql = @sql + N' group by convert(date,TimeUP,111)';

		set @sql = @sql + N' union ';

		set @sql = @sql + N' select 1 as Id,@bit as IsDeleted,@start_time as AddDate,''fjall'' as Category,convert(date,TimeUP,111) as TimeUp,COUNT(ProbeID) as ProbeID from  '+@table_name;
		set @sql = @sql + N' where  ZTfj=1 and ProbeID=1 and TimeUP between @start_time and @end_time';
		set @sql = @sql + N' group by convert(date,TimeUP,111)';

		set @sql = @sql + N' union ';

		set @sql = @sql + N' select 2 as Id,@bit as IsDeleted,@start_time as AddDate,''jhq'' as Category,convert(date,TimeUP,111) as TimeUp,COUNT(ProbeID) as ProbeID from  '+@table_name;
		set @sql = @sql + N' where YouYanND>20 and ZTjhq=1 and ProbeID=1 and TimeUP between @start_time and @end_time';
		set @sql = @sql + N' group by convert(date,TimeUP,111)';

		set @sql = @sql + N' union ';

		set @sql = @sql + N' select 3 as Id,@bit as IsDeleted,@start_time as AddDate,''jhqall'' as Category,convert(date,TimeUP,111) as TimeUp,COUNT(ProbeID) as ProbeID from  '+@table_name;
		set @sql = @sql + N' where ZTjhq=1 and ProbeID=1 and TimeUP between @start_time and @end_time';
		set @sql = @sql + N' group by convert(date,TimeUP,111)';

		set @sql = @sql + N' order by convert(date,TimeUP,111)';
	    
	    print @sql;
	    
	    EXEC sp_executesql  @sql,
							N'@start_time datetime,@end_time datetime,@bit bit',   
							@start_time,@end_time,@bit
		
	end

	
END

GO

