using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CBT_Backend.Migrations
{
    public partial class upDModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "Assessments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "Assessments");
        }
    }
}
