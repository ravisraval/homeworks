class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @cups = Array.new(14) {[]}
    @name1 = name1
    @name2 = name2
    place_stones
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
    @cups.each_with_index do |cup, idx|
      4.times {cup << :stone} unless (idx == 6 || idx == 13)
    end
  end

  def valid_move?(start_pos)
    raise 'Invalid starting cup' unless start_pos.between?(0, 12) && start_pos != 6
    raise 'Invalid starting cup' if cups[start_pos].empty?
  end

  def make_move(start_pos, current_player_name)
      # empties cup
      stones = @cups[start_pos]
      @cups[start_pos] = []

      # distributes stones
      cup_idx = start_pos
      until stones.empty?
        cup_idx += 1
        cup_idx = 0 if cup_idx > 13
        # places stones in the correct current player's cups
        if cup_idx == 6
          @cups[6] << stones.pop if current_player_name == @name1
        elsif cup_idx == 13
          @cups[13] << stones.pop if current_player_name == @name2
        else
          @cups[cup_idx] << stones.pop
        end
      end

      render
      next_turn(cup_idx)
    end

  def next_turn(ending_cup_idx)
    # helper method to determine what #make_move returns
    if cups[ending_cup_idx].length == 0
      return :switch
    elsif ending_cup_idx == 6 || ending_cup_idx || 13
      return :promopt
    else
      return ending_cup_idx
    end

  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    return true if cups[0..5].all? {|cup| cup.empty?}
    return true if cups[7..12].all? {|cup| cup.empty?}
    false
  end

  def winner
    if cups[6].length > cups[13].length
      @name1
    elsif cups[13].length > cups[6].length
      @name2
    else
      :draw
    end
  end
end
