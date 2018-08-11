`include "top.v"

module tb();
   reg clk;

   top dut(.hwclk(clk));

   always begin
      clk = 1;
      #5;
      clk = 0;
      #5;
   end

   initial begin
      $dumpfile("bench.vcd");
      $dumpvars(0, tb);
   end

endmodule
