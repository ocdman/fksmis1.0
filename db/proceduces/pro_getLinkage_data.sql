USE [fksmis1]
GO

/****** Object:  StoredProcedure [dbo].[pro_getLinkage_data]    Script Date: 07/24/2014 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		fengxiao
-- Create date: 2014-07-02
-- Description:	取得一段时间内的间隔数据
-- =============================================
CREATE PROCEDURE [dbo].[pro_getLinkage_data] 
	@table_name varchar(20),
	@start_time datetime,
	@end_time datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	label1:begin
		DECLARE @sql nvarchar(max),@bit bit,@smallint smallint;
	    
	    IF not EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(@table_name) AND type in (N'U'))
		begin
			select * from DataAnalyse;
			return;
		end
	    
	    set @bit = CONVERT(bit,0);
	    set @smallint = CONVERT(smallint,0);
	    
		set @sql = N'select @bit as IsDeleted, convert(date,TimeUP,111) as TimeUp,count(ZTfj) as ZTfjCount,count(ZTjhq) as ZTjhqCount,getdate() as AddDate,0 as id,0 as ProbeID,getdate() as TimeGet,@smallint as YouYanND,@smallint as YouYanWD,@smallint as YouYanSD,@bit as ZTsb,@bit as ZTfj,@bit as ZTjhq,@smallint as ZTqd from ' + @table_name;
		set @sql = @sql + N' where TimeUP between @start_time and @end_time and ztfj = 1 and ztjhq = 1';
		set @sql = @sql + N' group by convert(date,TimeUP,111)';
		set @sql = @sql + N' order by TimeUP';
		
		print @sql;
		
		EXEC sp_executesql  @sql,
							N'@start_time datetime,@end_time datetime,@bit bit,@smallint smallint',   
							@start_time,@end_time,@bit,@smallint
	end
END




GO

