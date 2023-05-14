using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CBT_Backend.Migrations
{
    public partial class anotherUpdateModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Assessment_Id",
                table: "Options");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Assessment_Id",
                table: "Options",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
