class Stack
   def initialize
     @stack = []
   end

   def add(el)
     @stack.push(el)
   end

   def remove
     @stack.pop
   end

   def show
     @stack.dup
   end
 end

class Queue

  def initialize
    @queue = []
  end

  def enqueue(el)
    @queue.push(el)
  end

  def dequeue
    @queue.shift
  end

  def show
    @queue.dup
  end
end
x = [[1,2], [3,4]]
y = x.dup
class Map

  def initialize
    @map = []
  end

  def assign(key, value)

    change_happened = false

    @map.each do |subarr| #updates map if that map already had the key
      if subarr[0] == key
        subarr[1] = value
        change_happened = true
      end
    end

    if change_happened == false #otherwise just push [k,v]
      @map.push([key, value])
    end
  end

  def lookup(key)
    @map.each do |subarr|
      if subarr[0] == key
        return subarr[1]
      end
    end
  end

  def remove(key)
      @map.reject! { |sub| sub[0] == key}
    end

  def show
    deep_dup(@map)
  end

  def deep_dup(arr)
    arr.map { |el| el.is_a?(Array) ? deep_dup(el) : el}
  end

end
