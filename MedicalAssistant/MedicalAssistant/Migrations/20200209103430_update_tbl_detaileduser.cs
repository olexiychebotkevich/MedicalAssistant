using Microsoft.EntityFrameworkCore.Migrations;

namespace MedicalAssistant.Migrations
{
    public partial class update_tbl_detaileduser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "tblDetailedUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "tblDetailedUsers");
        }
    }
}
