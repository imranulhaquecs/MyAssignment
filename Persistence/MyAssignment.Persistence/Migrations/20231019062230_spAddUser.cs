using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAssignment.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class spAddUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string procedure = @"CREATE PROCEDURE spAddUser 
                                           @user_id                      NVARCHAR(20)  = NULL, 
                                           @name						 NVARCHAR(200)  = NULL,
                                           @email_id                     NVARCHAR(256)  = NULL, 
                                           @mobile_number                NVARCHAR(20)  = NULL,
	                                       @password					 NVARCHAR(max)  = NULL	
                                    AS 
                                    BEGIN 
                                         SET NOCOUNT ON 

                                         INSERT INTO Users
                                              (                    
                                                UserId,
                                                [Name],
                                                EmailId,
			                                    MobileNumber,
                                                [Password]                 
                                              ) 
                                         VALUES 
                                              ( 
                                                @user_id,
                                                @name,
                                                @email_id,
                                                @mobile_number,
			                                    @password
                                              ) 
                                    END";
            migrationBuilder.Sql(procedure);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string procedure = @"DROP PROCEDURE spAddUser";
            migrationBuilder.Sql(procedure);
        }
    }
}
