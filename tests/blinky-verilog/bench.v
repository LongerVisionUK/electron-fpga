module tb();
   parameter PERIOD = 1;
   parameter TIME = 100;

   reg clk;

   top dut(.hwclk(clk));

   initial begin
      clk = 0;
   end

   always begin
      #(PERIOD) clk = ~clk;
   end

   initial begin
      #(TIME);
      $finish;
   end

   initial begin
      $dumpfile("bench.vcd");
      $dumpvars(0, tb);
   end

endmodule
