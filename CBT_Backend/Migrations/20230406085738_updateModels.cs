using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CBT_Backend.Migrations
{
    public partial class updateModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Courses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UsersId",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
